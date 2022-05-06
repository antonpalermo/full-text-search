import React, { useState } from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Text,
  Stack
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'

import { debounce } from 'lodash'

export function FormGroup() {
  const initialData = {
    query: ''
  }

  const [open, setOpen] = useState(false)
  const [data, setData] = useState([])

  async function fuzzySearch(keyword: string) {
    const req = await fetch(`/api/search?keyword=${keyword}`)
    const result = await req.json()
    if (
      typeof result === 'object' &&
      Array.isArray(result) &&
      result.length >= 1
    ) {
      setOpen(true)
      setData(result)
    } else {
      setOpen(false)
    }
  }

  const handleQuery = debounce(value => {
    fuzzySearch(value)
  }, 500)

  return (
    <Box position={'relative'}>
      <Popover isOpen={open} autoFocus={false} placement={'bottom'}>
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
        <Box position="relative" mt="2">
          <PopoverContent>
            <PopoverBody>
              <Text>Search Result</Text>
              {data && (
                <>
                  {data.map(user => (
                    <h1 key={user.id}>{user.email}</h1>
                  ))}
                </>
              )}
            </PopoverBody>
          </PopoverContent>
        </Box>
      </Popover>
    </Box>
  )
}
