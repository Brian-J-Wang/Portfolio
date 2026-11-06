import styles from "./projectCarousel.module.css";
import type { Project } from "@/components/projects/project.types";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	useCarousel,
} from "@/components/ui/carousel";
import ProjectCard from "../projectCard/projectCard";
import { ArrowRight, Sparkles } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";

type ProjectCarouselProps = {
	projects: Project[];
	className?: string;
};

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({
	projects,
	className,
}) => {
	return (
		<Carousel
			orientation="vertical"
			opts={{
				align: "start",
			}}
			className={className}
		>
			<CarouselContent className="h-240">
				{projects.map((project) => (
					<CarouselItem
						key={project.node_id}
						className={styles.carouselItem}
					>
						<ProjectCard projectData={project.project_data} />
					</CarouselItem>
				))}

				<CarouselItem className={styles.carouselItem}>
					<a
						href="/projects"
						className={styles.exploreCard}
						aria-label="View all projects in the archive"
					>
						<div className={styles.exploreCard__icon}>
							<Sparkles className="w-5 h-5" />
						</div>
						<h3 className={styles.exploreCard__title}>
							Explore More Projects
						</h3>
						<p className={styles.exploreCard__desc}>
							Looking for more? Browse the complete collection of
							work, open-source tools, and experiments.
						</p>
						<span className={styles.exploreCard__cta}>
							View All Projects
							<ArrowRight className="w-4 h-4" />
						</span>
					</a>
				</CarouselItem>
			</CarouselContent>
			<CarouselPagination />
		</Carousel>
	);
};

const CarouselPagination: React.FC = () => {
	const { api } = useCarousel();
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

	const onSelect = useCallback(() => {
		if (!api) return;
		setSelectedIndex(api.selectedScrollSnap());
	}, [api]);

	const onInit = useCallback(() => {
		if (!api) return;
		setScrollSnaps(api.scrollSnapList());
	}, [api]);

	useEffect(() => {
		if (!api) return;

		onInit();
		onSelect();
		api.on("reInit", onInit);
		api.on("reInit", onSelect);
		api.on("select", onSelect);

		return () => {
			api.off("reInit", onInit);
			api.off("reInit", onSelect);
			api.off("select", onSelect);
		};
	}, [api, onInit, onSelect]);

	if (scrollSnaps.length <= 1) return null;

	return (
		<div
			className={styles.pagination}
			role="tablist"
			aria-label="Project carousel pagination"
		>
			{scrollSnaps.map((_, index) => {
				const isSelected = selectedIndex === index;
				return (
					<button
						key={index}
						type="button"
						role="tab"
						aria-selected={isSelected}
						aria-label={`Go to slide ${index + 1} of ${scrollSnaps.length}`}
						className={clsx(
							styles.paginationDot,
							isSelected && styles.paginationDotActive,
						)}
						onClick={() => api?.scrollTo(index)}
					/>
				);
			})}
		</div>
	);
};

export default ProjectCarousel;
