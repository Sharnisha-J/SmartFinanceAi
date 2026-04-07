const express = require("express");
const router= express.Router();
const protect = require("../middleware/authMiddleware");
const Expense = require("../models/Expenses");
//add expense//
router.post("/",protect,async(req,res)=>{
    try{
      const{title,amount,category}=req.body;
       const expense = await Expense.create({
        user:req.user,
        title,
        amount,
        category
       });
       res.status(201).json(expense);

    }
    catch(error)
    {
        res.status(500).json({message:error.message});
    }
});
//get
router.get("/",protect,async(req,res)=>{
   try{
    const expenses=await Expense.find({user:req.user}).sort({date:-1})
    res.json(expenses);
   }
   catch(error)
   {
    res.status(500).json({message:error.message});
   } 
    
});
module.exports=router;
//delete
router.delete("/:id",protect,async(req,res)=>{
    try{
        const expense = await Expense.findById(req.params.id);
        if(!expense)
        {
            return res.status(404).json({message:"Expense not found"});
        }
        if(expense.user.toString()!==req.user.toString())
        {
            return res.status(401).json({message:"Not authorized"});
        }
        await expense.deleteOne();
        res.json({message:"Expense removed"});
    }
    catch(error)
    {
        res.status(500).json({message:error.message});
    }
});
// update expense
router.put("/:id", protect, async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.user.toString() !== req.user.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    expense.title = title || expense.title;
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;

    const updatedExpense = await expense.save();

    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/summary", protect, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user });

    const total = expenses.reduce((acc, item) => acc + item.amount, 0);

    res.json({ total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//category breakdown.
router.get("/categories",protect,async(req,res)=>{
  try{
    const expenses = await Expense.find({user:req.user});
    const breakdown={};
    expenses.forEach((expense)=>{
      if(breakdown[expense.category])
      {
        breakdown[expense.category]+=expense.amount;
      }
      else{
        breakdown[expense.category]=expense.amount;
      }
    });
    res.json(breakdown);
  }
  catch(error)
  {
    res.status(500).json({message:error.message});
  }
});
//monthly breakdown
router.get("/monthly",protect,async(req,res)=>{
try{
  const expenses = await Expense.find({user:req.user});
  const monthlyData = {};
  expenses.forEach((expense)=>{
    const date = new Date(expense.createdAt);
  const monthYear = date.toLocaleString("default",{
    month:"long",
    year:"numeric",
  });
  if(monthlyData[monthYear])
  {
    monthlyData[monthYear]+=expense.amount;
  }
  else
  {
    monthlyData[monthYear]=expense.amount;
  }
});
res.json(monthlyData);
}
catch(error)
{
  res.status(500).json({message:error.message});
}
});
const { GoogleGenerativeAI } = require("@google/generative-ai");

router.get("/ai-insights", protect, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user });

    // Convert expenses into text
    const expenseText = expenses
      .map((e) => `${e.title} - ₹${e.amount} (${e.category})`)
      .join("\n");

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
You are a financial advisor.

Analyze the following expenses and give:
1. Spending summary
2. Category insights
3. Suggestions to save money

Expenses:
${expenseText}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ insights: text });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});