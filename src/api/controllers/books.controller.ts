import { Request, Response } from 'express';
import { FieldPacket } from 'mysql2/promise';

import { connect } from '../../database';
import { Book } from '../interfaces/Book';

export const getBooks = async (req: Request, res: Response): Promise<Response> => {
  try {
    const con = await connect();
    const [books]: [any[], FieldPacket[]] = await con.query('SELECT * FROM books');

    return res.json({ success: true, books });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Internal server error!',
    });
  }
};

export const createBook = async (req: Request, res: Response): Promise<Response> => {
  try {
    const newBook: Book = req.body;

    const con = await connect();
    await con.query('INSERT INTO books SET ?', [newBook]);

    return res.json({
      success: true,
      message: 'Book created successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Internal server error!',
    });
  }
};

export const getBook = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const con = await connect();
    const [book]: [any[], FieldPacket[]] = await con.query('SELECT * FROM books WHERE id = ?', [
      id,
    ]);

    if (book.length > 0) {
      return res.json({
        success: true,
        book: book[0],
      });
    }

    return res.status(404).json({
      success: false,
      message: 'Book not found!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Internal server error!',
    });
  }
};

export const updateBook = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title, description, image_url, id }: Book = req.body;

    const con = await connect();
    await con.query(
      `UPDATE books 
			SET title = ?, description = ?, image_url = ?, created_at = ? WHERE id = ?`,
      [title, description, image_url, new Date(), id]
    );

    return res.json({
      success: true,
      message: 'Book updated successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Internal server error!',
    });
  }
};

export const deleteBook = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const con = await connect();
    await con.query('DELETE FROM books WHERE id = ?', [id]);

    return res.json({
      success: true,
      message: 'Book deleted successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Internal server error!',
    });
  }
};
