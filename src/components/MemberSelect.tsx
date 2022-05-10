import React, { ReactElement, ReactNode, useRef, useState } from 'react'
import {
  Box,
  FormLabel,
  Input,
  Heading,
  Text,
  Avatar,
  AvatarProps,
  Stack,
  StackProps,
  useColorModeValue,
  Popover,
  PopoverContent,
  PopoverBody,
  useBoolean,
  Spacer,
  Button
} from '@chakra-ui/react'
import { Form, Formik, FormikProps } from 'formik'
import { BiUserCircle } from 'react-icons/bi'

export interface User {
  name: string
  email: string
  [key: string]: any
}

export interface MemberCardProps extends StackProps {
  name?: string
}

export function MemberCard({ name, ...props }: MemberCardProps) {
  return (
    <Stack
      direction="row"
      alignItems={'center'}
      shadow="xs"
      bg={useColorModeValue('gray.100', 'gray.800')}
      rounded="lg"
      py={2}
      px={3}
      {...props}
      cursor="pointer"
    >
      <Avatar icon={<BiUserCircle fontSize="1.8rem" />} />
      <Text fontWeight={'medium'}>{name}</Text>
      <Spacer />
      <Button>Close</Button>
    </Stack>
  )
}

export interface MemberSelectProps {
  users: User[]
}

export function MemberSelect({ users }: MemberSelectProps) {
  const [isOpen, setIsOpen] = useBoolean(false)
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users)
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])

  const data = {
    query: ''
  }

  const handleSelectedUser = (user: User) => {
    setSelectedUsers(old => [...old, user])
  }

  const onInputChange = (query: string) => {
    if (query === '') {
      setIsOpen.off()
    } else {
      setIsOpen.on()
    }

    if (!users) {
      return
    }

    const matchedUser = users.filter(e => e.name.includes(query))
    setFilteredUsers(matchedUser)
  }

  return (
    <Box minW="lg" maxW="md" my={10}>
      <Heading as="h4" size="md" mb={5}>
        Add class members
      </Heading>
      <Box>
        <Popover
          isOpen={isOpen}
          onOpen={setIsOpen.on}
          onClose={setIsOpen.off}
          closeOnBlur={true}
          closeOnEsc={true}
          autoFocus={false}
        >
          <Formik initialValues={data} onSubmit={() => {}}>
            {({ values, handleChange }) => (
              <Form>
                <FormLabel htmlFor="query">Select Members</FormLabel>
                <Input
                  id="query"
                  type="text"
                  value={values.query}
                  onChange={e => {
                    handleChange(e)
                    onInputChange(e.target.value)
                  }}
                  autoComplete={'off'}
                />
              </Form>
            )}
          </Formik>
          <Box position="relative" mt={3}>
            <PopoverContent style={{ width: '100%' }}>
              <PopoverBody
                overflowY="auto"
                maxH="sm"
                css={{
                  '&::-webkit-scrollbar': { width: '4px' },
                  '&::-webkit-scrollbar-track': {
                    width: '6px'
                  },
                  '&::-webkit-scrollbar-thumb': {
                    borderRadius: '24px'
                  }
                }}
              >
                {filteredUsers.map(user => (
                  <MemberCard
                    mt={2}
                    key={user.id}
                    name={user.name}
                    onClick={() => handleSelectedUser(user)}
                  />
                ))}
              </PopoverBody>
            </PopoverContent>
          </Box>
        </Popover>
        <Box mt={5}>
          {selectedUsers.map(user => (
            <MemberCard mt={2} key={user.id} name={user.name} spacing={6} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
