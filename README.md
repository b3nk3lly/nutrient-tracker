# NutrientTracker

This web app is designed to help users track the nutritional content of their meals. Enter the food and quantities of your meals, select nutrients to track, and then generate a report of the nutrients contained in each meal.

Data used in this app (food options, serving sizes, nutrient options, and nutritional values) all come from Health Canada's **Canadian Nutrient File (CNF)**, which you can access here: [Canadian Nutrient File](https://food-nutrition.canada.ca/cnf-fce/). 

## Running the app

### Requirements

To run NutrientTracker, you'll need:
- [Node.js](https://nodejs.org/) (v22 or higher)
- [npm](https://www.npmjs.com/) (v10 or higher)

### Installation

**1. Clone the repository:**
   
```sh
git clone https://github.com/b3nk3lly/nutrient-tracker.git
cd nutrient-tracker
```

**2. Install dependencies:**

```sh
npm install
```

**3. Run the application:**

```sh
npm start
```

## Usage

**1. Enter food:**
- Create one or more meals and give them each a name.
- Use the search bar to add food to each meal.
- Enter the quantity of each food, along with the unit of quantity (grams, millilitres, etc.)

**2. Select nutrients:**
- Select the nutrients you want to include in your report.

**3. Generate report:**
- Click the "Generate Report" button to view the nutritional breakdown of your meals. You can export the report to a CSV file as well.

## License

This project is licensed under the GNU General Public License v3.0. See [LICENSE](LICENSE) for details.

## Acknowledgements
- Thanks to Health Canada for making and maintaining the Canadian Nutrient File and its public API.
- Thanks to my girlfriend Rylee for showing me her nutrition class assignments, which inspired me to make this, and for all the feedback along the way :)

## Contact

For any questions or feedback, please feel free to reach out to me at [benjkelly98@gmail.com](mailto:benjkelly98@gmail.com?subject=[GitHub]%20NutrientTracker).
