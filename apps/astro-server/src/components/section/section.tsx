interface SectionProps {
    children: React.ReactNode;
}

const Section = ({ children }: SectionProps) => {
    return (
        <section className="flex flex-row justify-center">
            { children }
        </section>
    )
}

export default Section