"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";

function Header() {
	const [tooltip, setTooltip] = useState("");
	const [userMenu, setUserMenu] = useState(false);
  const menu = useRef<null | HTMLDivElement>(null);

	return (
		<header className="h-16 w-full border-b border-b-gray-600 flex">
			<div className="bg-white h-full w-4/5 flex"></div>

			<div className="h-full w-2 flex justify-center items-center">
				<span className="h-6 w-px bg-gray-600"></span>
			</div>

			<div className="h-full w-1/5 flex items-center pr-4 p-2 flex-row-reverse gap-2 relative">
				<div
					className="h-10 w-10 rounded-full relative"
					onMouseEnter={() => setTooltip("Open user navigation menu")}
					onMouseLeave={() => setTooltip("")}>
					<Image
						src="/images/logo.png"
						width={100}
						height={100}
						onClick={() => setUserMenu((prev) => !prev)}
						alt="User"
						className="h-full w-full rounded-full cursor-pointer"
					/>

					{tooltip && (
						<span
							className="absolute top-full right-0 mt-1 z-10
              whitespace-nowrap bg-gray-800 text-white
               text-xs px-3 py-1 rounded shadow-md">
							{tooltip}
						</span>
					)}

					{userMenu && (
						<div
							className="absolute top-full mt-1 right-0 w-60 bg-black border border-gray-600 p-3 rounded-xl"
							onMouseEnter={() => setTooltip("")}>
							<nav className="flex flex-col gap-2">
								<div className="flex px-2 gap-2">
									<Image
										src="/images/logo.png"
										width={100}
										height={100}
										alt="User"
										className="h-12 w-12 rounded-full"
									/>
									<div className="">
										<h1 className="-mb-1 truncate w-30">
											username
										</h1>
										<h1
											className="text-gray-400"
											title={"fullname"}>
											fullname
										</h1>
									</div>
								</div>
								<hr className="border-t border-gray-600 border-0" />
								<div className="flex w-full gap-2 flex-col">
									<Link href={"/"}>Profile</Link>
									<Link href={"/"}>Dashboard</Link>
									<Link href={"/"}>My Posts</Link>
									<Link href={"/"}>Settings</Link>
								</div>
								<hr className="border-t border-gray-600 border-0" />
								<div>{/* Log out */}</div>
							</nav>
						</div>
					)}
				</div>

				<h2>lash</h2>
			</div>
		</header>
	);
}

export default Header;
