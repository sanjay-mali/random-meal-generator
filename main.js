const meal_btn = document.getElementById('meal-btn');
const meal_div = document.getElementById('meal');

meal_btn.addEventListener('click', () => {

    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(response => {
            createMeal(response.meals[0]);
        })
        .catch(err => console.log(err))

})

const createMeal = (meal) => {
    const ingredients = [];

    for (let i = 1; i < 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        }
        else {
            break;
        }
    }
    console.log(meal);

    const newInnerHTML = `
    
    <div class="row">
        <div class="columns col-lg-6 col-md-6 col-12 five">
            <img src="${meal.strMealThumb}" alt="Meal Picture">
            <p><strong>Category:</strong>
            ${meal.strCategory}</p>
            <p> <strong>Area: </strong>${meal.strArea} </p>
            <p> <strong>Tags: </strong>${meal.strTags}</p>
            <h4>Ingredients:</h4>
            <ul>
                ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
        </div>
    </div>

    <div class="columns col-lg-6 col-md-6 col-12">
        <h4>${meal.strMeal}</h4>
        <p>${meal.strInstructions}</p>
    </div>

    <div class="row">
		<h5>Video Recipe</h5>
        <div class="videoWrapper">
		<iframe width="420" height="315" src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}"></iframe>		
        </div>
	</div>

    `;

    meal_div.innerHTML = newInnerHTML;
} 