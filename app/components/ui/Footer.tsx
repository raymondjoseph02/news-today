import Link from "next/link";

function Footer() {
  const links = [
    {
      path: "/about-us",
      name: "about us ",
    },
    {
      path: "/contact",
      name: "contact ",
    },
    {
      path: "/privacy-policy",
      name: "privacy policy ",
    },
    {
      path: "/team-of-service",
      name: "team of service",
    },
  ];
  return (
    <footer className="py-6 bg-gray-150 ">
      <div className="container-wrapper space-y-2">
        <ul className="flex items-center sm:gap-4 gap-3 flex-wrap lg:gap-6  justify-center">
          {links.map((link, idx) => (
            <li
              className="capitalize text-gray-500 text-lg font-medium hover:text-gray-400 transition ease-in-out duration-300"
              key={link.name + idx}
            >
              <Link href={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
        <p className="text-center text-lg font-medium text-gray-400">
          &copy; 2024 New Today. All right reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
