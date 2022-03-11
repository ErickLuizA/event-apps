import { Router } from 'express'
import multer from 'multer'
import { createCategoryController } from '@/modules/cars/useCases/createCategory'
import { listCategoriesController } from '@/modules/cars/useCases/listCategories'
import { importCategoriesController } from '@/modules/cars/useCases/importCategories'

const upload = multer({
  dest: './tmp',
})

export default (router: Router) => {
  router.post('/categories', (request, response) =>
    createCategoryController.handle(request, response)
  )

  router.get('/categories', (request, response) =>
    listCategoriesController.handle(request, response)
  )

  router.post(
    '/categories/import',
    upload.single('file'),
    (request, response) => importCategoriesController.handle(request, response)
  )
}
