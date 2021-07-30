import { Router } from 'express';

import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from '../controllers/books.controller';

const router = Router();

router.route('/').get(getBooks).post(createBook).patch(updateBook);
router.route('/:id').get(getBook).delete(deleteBook);

export default router;
