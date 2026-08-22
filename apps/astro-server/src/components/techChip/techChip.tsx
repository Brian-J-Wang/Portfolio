import { Chip, type SkillChipKeys } from "@components/techChip/chips";

interface Props {
	chip: SkillChipKeys | string;
}

const TechChip: React.FC<Props> = ({ chip }) => {
	const chipData = new Chip(chip);

	return (
		<div
			style={{
				backgroundColor: chipData.backgroundColor,
				color: chipData.textColor,
			}}
			className="flex flex-row py-1 px-1.5 h-6 gap-2 items-center rounded-xs"
		>
			{chipData.icon && (
				<img
					src={chipData.icon}
					alt={chipData.name}
					className="h-full"
				/>
			)}
			<span className="text-sm">{chipData.name}</span>
		</div>
	);
};

export default TechChip;
