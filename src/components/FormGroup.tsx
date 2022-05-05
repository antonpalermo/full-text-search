import React, { useState } from 'react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { Form, Formik } from 'formik'

import { debounce } from 'lodash'

export function FormGroup() {
  const initialData = {
    query: ''
  }

  const [data, setData] = useState([])

  async function fuzzySearch(keyword: string) {
    const req = await fetch(`/api/search?keyword=${keyword}`)
    const result = await req.json()
    setData(result)
  }

  const handleQuery = debounce(value => {
    fuzzySearch(value)
  }, 500)

  return (
    <>
      <Formik initialValues={initialData} onSubmit={() => {}}>
        {({ values, handleChange }) => (
          <Form>
            <FormControl>
              <FormLabel>Search</FormLabel>
              <Input
                name="query"
                value={values.query}
                onChange={e => {
                  handleChange(e)
                  handleQuery(e.target.value)
                }}
                autoComplete="off"
              />
            </FormControl>
          </Form>
        )}
      </Formik>
      {data && (
        <>
          {data?.map(user => (
            <>
              <h1 key={user.email}>{user.email}</h1>
              <p>{user.name}</p>
            </>
          ))}
        </>
      )}
    </>
  )
}
