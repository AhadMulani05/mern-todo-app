const Todo = require("../models/Todo");

exports.getTodos = async (req, res) => {
  const todos = await Todo.find({ userId: req.userId });
  res.json(todos);
};

exports.addTodo = async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    completed: false,
    userId: req.userId,
  });
  res.json(todo);
};

exports.updateTodo = async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

exports.deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
