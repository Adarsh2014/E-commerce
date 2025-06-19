Day Wednesday 18 June, Started 3:23 PM

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

(4) under the feature folder, we use one template css template known as "Product list" we direct copy code from there in our ProductList jsx and its work fine on screen as it should.

Link of Code: https://tailwindcss.com/plus/ui-blocks/ecommerce/components/product-lists

(5) take another template name feature category to filter product and use below code in same file which is ProductList.jsx

code : https://tailwindcss.com/plus/ui-blocks/ecommerce/components/category-filters

(6) we use another code from tailwind css that is Navbar(Stacked Layouts) and we created the new feature named as Navbar and paste entire code. in the place "{/* Your content */}" we pass children as props which is Product list

Link of code: https://tailwindcss.com/plus/ui-blocks/application-ui/application-shells/stacked

(7) at the last of Product List code we add pagination code from tailwind css below <section> tag and successfully can see UI of paggination at bottom

Link of code: https://tailwindcss.com/plus/ui-blocks/application-ui/navigation/pagination

--> Here we completed our first section of product!