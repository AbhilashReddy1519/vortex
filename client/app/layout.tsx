import type { Metadata } from "next";
import { Fleur_De_Leah, Quintessential } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const FleurDeLeah = Fleur_De_Leah({
	variable: "--font-fleur-de-leah",
	subsets: ["latin"],
	weight: "400",
});

const quintessential = Quintessential({
	variable: "--font-quintessential",
	subsets: ["latin"],
	weight: "400",
});

export const metadata: Metadata = {
	title: "Vortex",
	description: "A professional developer community",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<body
				className={`${FleurDeLeah.variable} ${quintessential.variable} font-serif`}>
				<Providers>
					<main>{children}</main>
				</Providers>
			</body>
		</html>
	);
}
