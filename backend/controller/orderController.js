import asyncHandler from '../middleware/asyncHandler.js'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'

// @desc    Create new order with server-calculated prices and stock validation
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body

  if (!orderItems || orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  }

  // 1. Fetch matching products directly from MongoDB to verify authenticity and prices
  const productIds = orderItems.map((item) => item.product || item._id)
  const itemsFromDB = await Product.find({ _id: { $in: productIds } })

  if (itemsFromDB.length !== orderItems.length) {
    res.status(404)
    throw new Error('One or more products in your order were not found')
  }

  // 2. Validate stock count and map order items
  const dbOrderItems = orderItems.map((itemFromClient) => {
    const matchingProduct = itemsFromDB.find(
      (p) => p._id.toString() === (itemFromClient.product || itemFromClient._id).toString()
    )

    if (!matchingProduct) {
      res.status(404)
      throw new Error(`Product not found: ${itemFromClient.name}`)
    }

    const requestedQty = Number(itemFromClient.qty)
    if (matchingProduct.countInStock < requestedQty) {
      res.status(400)
      throw new Error(
        `Insufficient stock for "${matchingProduct.name}". Only ${matchingProduct.countInStock} available.`
      )
    }

    const itemImage =
      itemFromClient.image ||
      (itemFromClient.images && itemFromClient.images[0]) ||
      (matchingProduct.images && matchingProduct.images[0]) ||
      ''

    return {
      name: matchingProduct.name,
      qty: requestedQty,
      image: Array.isArray(itemImage) ? itemImage : [itemImage],
      price: matchingProduct.price,
      product: matchingProduct._id,
      _id: undefined,
    }
  })

  // 3. Recalculate all financial values server-side (DO NOT TRUST CLIENT)
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2)

  const itemsPrice = Number(
    addDecimals(dbOrderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
  )
  const shippingPrice = Number(addDecimals(itemsPrice > 100 ? 0 : 35))
  const taxPrice = Number(addDecimals(0.15 * itemsPrice))
  const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2))

  const order = new Order({
    orderItems: dbOrderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user._id,
  })

  const createdOrder = await order.save()
  res.status(201).json(createdOrder)
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.status(200).json(orders)
})

// @desc    Get order by ID with IDOR protection
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')

  if (!order) {
    res.status(404)
    throw new Error('Order not found')
  }

  // IDOR Protection: allow only the order owner or an admin
  const orderUserId = order.user._id ? order.user._id.toString() : order.user.toString()
  const currentUserId = req.user._id.toString()

  if (orderUserId !== currentUserId && !req.user.isAdmin) {
    res.status(403)
    throw new Error('Not authorized to view this order')
  }

  res.status(200).json(order)
})

// @desc    Update order to paid and atomically decrement product inventory
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    res.status(404)
    throw new Error('Order not found')
  }

  // Ensure only the order owner or an admin can update payment status
  const orderUserId = order.user.toString()
  if (orderUserId !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(403)
    throw new Error('Not authorized to update this order')
  }

  if (!order.isPaid) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id || req.body.details?.id,
      status: req.body.status || req.body.details?.status,
      update_time: req.body.update_time || req.body.details?.update_time,
      email_address: req.body.payer?.email_address || req.body.details?.payer?.email_address,
    }

    // Atomically decrement stock count
    for (const item of order.orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { countInStock: -item.qty },
      })
    }

    const updatedOrder = await order.save()
    return res.status(200).json(updatedOrder)
  }

  res.status(200).json(order)
})

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    res.status(404)
    throw new Error('Order not found')
  }

  order.isDelivered = true
  order.deliveredAt = Date.now()

  const updatedOrder = await order.save()
  res.status(200).json(updatedOrder)
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.status(200).json(orders)
})

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
}