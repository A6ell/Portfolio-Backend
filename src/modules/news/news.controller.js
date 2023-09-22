// news.controller.js

import { News } from "./news.model.js";
import mongoose from 'mongoose';


export const findAll = async (req, res) => {
  const query = req.query;
  const sort = { createdAt: -1 };

  News.find(query)
    .sort(sort)
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json(error));
};

// Create a new news article
export const createNews = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Create a new news article
    const news = new News({ title, content });

    // Save the news article to the database
    const savedNews = await news.save();

    res.status(201).json(savedNews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create news article' });
  }
};

// Retrieve a specific news article by ID
export const getNewsById = async (req, res) => {
  try {
    const newsId = req.params.id;

    if (!mongoose.isValidObjectId(newsId)) {
      return res.status(400).json({ message: 'Invalid resource id' });
    }

    // Find the news article by ID
    const news = await News.findById(newsId);

    if (!news) {
      return res.status(404).json({ message: 'News article not found' });
    }

    res.json(news);
  } catch (error) {
    console.error('Failed to fetch news article:', error);
    res.status(500).json({ message: 'Failed to fetch news article' });
  }
};

// Update a specific news article by ID
export const updateNews = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newsId = req.params.id;

    if (!mongoose.isValidObjectId(newsId)) {
      return res.status(400).json({ message: 'Invalid resource id' });
    }

    // Update the news article by ID
    const updatedNews = await News.findByIdAndUpdate(
      newsId,
      { title, content },
      { new: true }
    );

    if (!updatedNews) {
      return res.status(404).json({ message: 'News article not found' });
    }

    res.json(updatedNews);
  } catch (error) {
    console.error('Failed to update news article:', error);
    res.status(500).json({ message: 'Failed to update news article' });
  }
};

// Delete a specific news article by ID
export const deleteNews = async (req, res) => {  
  try {
    const newsId = req.params.id;

    if (!mongoose.isValidObjectId(newsId)) {
      return res.status(400).json({ message: 'Invalid resource id' });
    }

    // Delete the news article by ID
    const deletedNews = await News.findByIdAndRemove(newsId);

    if (!deletedNews) {
      return res.status(404).json({ message: 'News article not found' });
    }

    res.json({ message: 'News article deleted' });
  } catch (error) {
    console.error('Failed to delete news article:', error);
    res.status(500).json({ message: 'Failed to delete news article' });
  }
};

