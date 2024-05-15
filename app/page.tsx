import NutrientReporterForm from "./_components/NutrientReporterForm";

export default function Home() {
	return (
		<main className="min-h-screen flex flex-col items-center">
			<div className="flex flex-col items-center p-8 w-full md:w-3/4 lg:w-1/2">
				<h1>Nutrient Reporter</h1>
				<NutrientReporterForm />
			</div>
		</main>
	);
}
