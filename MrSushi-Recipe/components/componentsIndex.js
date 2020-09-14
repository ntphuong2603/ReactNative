const { default: SearchRecipe } = require("./searchRecipe");
const { default: EditRecipe } = require("./editRecipe");
const { default: InputRecipe } = require("./inputRecipe");
const { default: BottomTab } = require("./bottomTab");
const { default: OrderRecipe } = require("./orderRecipe");

module.exports = {
    SearchRecipe: SearchRecipe,
    EditRecipe: EditRecipe,
    InputRecipe: InputRecipe,
    OrderRecipe: OrderRecipe,
    BottomTab: BottomTab,
}