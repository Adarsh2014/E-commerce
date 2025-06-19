Day Wednesday 18 June, Started 3:23 PM

<b>Section 0</b>

(1)Setup React Vite in VS Code:

command - > npm create vite@latest E-commerce -- --template react

--> Here You are ready to see your project structure

(2) Setup Tailwind CSS in Vite
-> npm install tailwindcss @tailwindcss/vite
-> add below code to vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
plugins: [
tailwindcss(),
],
})
-> Add below to index.css
@import "tailwindcss";

--> Here You are ready to use Tailwind css code in your project

(3) Setup Redux in project
-> npm install @reduxjs/toolkit
-> npm install react-redux

--> Here you are ready to use Global redux state management in your project

<b>Section 1</b>

(4) under the feature folder, we use one template css template known as "Product list" we direct copy code from there in our ProductList jsx and its work fine on screen as it should.

Link of Code: https://tailwindcss.com/plus/ui-blocks/ecommerce/components/product-lists

(5) take another template name feature category to filter product and use below code in same file which is ProductList.jsx

code : https://tailwindcss.com/plus/ui-blocks/ecommerce/components/category-filters

(6) we use another code from tailwind css that is Navbar(Stacked Layouts) and we created the new feature named as Navbar and paste entire code. in the place "{/_ Your content _/}" we pass children as props which is Product list

Link of code: https://tailwindcss.com/plus/ui-blocks/application-ui/application-shells/stacked

(7) at the last of Product List code we add pagination code from tailwind css below <section> tag and successfully can see UI of paggination at bottom

Link of code: https://tailwindcss.com/plus/ui-blocks/application-ui/navigation/pagination

--> Here we completed our first section of product!

<b>Section 2</b>

(1) from tailwind css we use Login and sign up form template with below code link and added in component section

Link of code: https://tailwindcss.com/plus/ui-blocks/application-ui/forms/sign-in-forms

(2) React Router
-> npm install react-router-dom and paste basic template code into app.js level

--> Here we have completed second section added login and signup page with proper routing

<b>Section 3</b>

(1) Added cart page template from Tailwind CSS and modified according to need and added routing for the same

Link to code : https://tailwindcss.com/plus/ui-blocks/ecommerce/components/shopping-carts

<b>Section 4</b>

(1) From Tailwind Css we copy one template named as form layout which we modified as checkout page! in below code except first div code, rest another two div code copy as it is and after that in bottom one new div created where we pasted entire code of cart.jsx for time being, will delete once we have actual Data.

Code Link: https://tailwindcss.com/plus/ui-blocks/application-ui/forms/form-layouts

(2) Now we modified containt of form, last div from above code "notification " converted into payment menthod and above that we created one Addresss header where we store from personal information address into <p> tag. after that we make existing addresses into radio option to select one address. last "cancel" and "save" button put below Personal information and checkpout cart page content modified. Also Router is set for pay. Here to store address we use one template from tailwind css. below is code link:

code link : https://tailwindcss.com/plus/ui-blocks/application-ui/lists/stacked-lists

(3) Product detailed Page: To show details of page, we choose product overview template from tailwind css. below is code link for the same.

code link: https://tailwindcss.com/plus/ui-blocks/ecommerce/components/product-overviews

-> We pasted entire code into ProductDetail component and Link to Map function of ProductList componente so that on clicking each item, redirect to that product detail.
-> After that we created one page "Productdetalpage" to show on app level.
