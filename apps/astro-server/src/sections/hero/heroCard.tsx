import clsx from "clsx";
import IconLink from "@/components/IconLink/IconLink";
import { Card, CardInset } from "@/components/ui/card";
import styles from "./hero.module.css";

export default function HeroCard() {
	return (
		<Card
			className={clsx(
				"h-full w-full flex-row! p-0! gap-0! border-0! mh-(--page-margins)",
				styles.hero__container,
			)}
		>
			<div className="h-full flex flex-col justify-center flex-1 ml-(--page-margins)">
				<h2 className="text-left mb-4 text-7xl">Hello!</h2>
				<p className={styles.heroContent__message}>
					I build full-stack web applications using Astro, TypeScript,
					and React.
				</p>
				<p className={styles.heroContent__message}>
					When I'm not building projects, you can find me hiking in
					New England. I'm currently trying to complete the Terrifying
					25.
				</p>
			</div>
			<img
				src="profile.png"
				alt="Casual image of me waving"
				className={styles.hero__profileImage}
			/>
			<CardInset anchor="bottomRight" className="flex flex-col gap-2 p-2">
				<IconLink
					href="https://www.linkedin.com/in/brian-j-wang/"
					type="linkedin"
				/>
				<IconLink
					href="https://github.com/Brian-J-Wang"
					type="github"
				/>
			</CardInset>
		</Card>
	);
}
