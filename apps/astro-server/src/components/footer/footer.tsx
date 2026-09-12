import ContactForm from "../contactForm/contactForm";

const Footer = () => {
	return (
		<footer className="flex flex-row justify-around bg-background m-0 w-full py-24 dark">
			<div className="flex flex-col">
				<h3 className="font-medium mb-1 text-neutral-50">
					Looking for a
				</h3>
				<h2 className="m-0 text-secondary">Freelance Developer?</h2>
			</div>
			<ContactForm />
		</footer>
	);
};

export default Footer;
