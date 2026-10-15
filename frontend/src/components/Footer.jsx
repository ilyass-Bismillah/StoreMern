import { MoveRight } from "lucide-react";

const Footer = () => {
  const footerNavs = [
    {
      href: "javascript:void()",
      name: "Terms",
    },
    {
      href: "javascript:void()",
      name: "License",
    },
    {
      href: "javascript:void()",
      name: "Privacy",
    },
    {
      href: "javascript:void()",
      name: "About us",
    },
  ];
  return (
    <footer className="pt-10">
      <div className="2xl:max-w-7xl lg:max-w-6xl md:max-w-3xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="space-y-6 sm:max-w-md sm:mx-auto sm:text-center">
          <img
            src="/ex.png"
            className="w-32 sm:mx-auto"
          />
          <p>
            Nulla auctor metus vitae lectus iaculis, vel euismod massa
            efficitur.
          </p>
          <div className="items-center gap-x-3 space-y-3 sm:flex sm:justify-center sm:space-y-0">
            <a
              href="javascript:void(0)"
              className="block py-2 px-4 text-center font-medium bg-white duration-150 hover:bg-white/80 active:bg-white/80 rounded-lg shadow-lg hover:shadow-none"
            >
              Let's get started
            </a>
            <a
              href="javascript:void(0)"
              className="flex items-center justify-center gap-x-2 py-2 px-4 text-gray-400 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg md:inline-flex"
            >
              Get access
              <MoveRight className="w-4 h-4"/>
            </a>
          </div>
        </div>
        <div className="mt-10 py-10 border-t items-center justify-between sm:flex">
          <p>© 2026 Float UI Inc. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-4 mt-6 sm:text-sm sm:mt-0">
            {footerNavs.map((item, idx) => (
              <li className="text-gray-800 hover:text-gray-500 duration-150">
                <a key={idx} href={item.href}>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer
