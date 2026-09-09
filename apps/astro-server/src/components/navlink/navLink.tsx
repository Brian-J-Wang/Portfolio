import styles from "./navLink.module.css";
import { cva } from "class-variance-authority";
import type { PropsWithChildren } from "react";

const NavlinkVariants = cva(styles.base, {
	variants: {
		isActive: {
			true: styles.active,
			false: styles.inactive,
		},
	},
	defaultVariants: {
		isActive: false,
	},
});

type NavlinkProps = React.ComponentProps<"a"> &
	PropsWithChildren & {
		href: string;
		isActive?: boolean;
	};

const Navlink: React.FC<NavlinkProps> = ({
	href,
	isActive,
	children,
	...props
}) => {
	return (
		<a {...props} href={href} className={NavlinkVariants({ isActive })}>
			{children}
		</a>
	);
};

export default Navlink;
