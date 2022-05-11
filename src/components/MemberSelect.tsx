import React, { useEffect, useRef, useState } from 'react'
import {
  Box,
  FormLabel,
  Input,
  Heading,
  Text,
  Avatar,
  Stack,
  StackProps,
  useColorModeValue,
  Popover,
  PopoverContent,
  PopoverBody,
  useBoolean,
  Spacer,
  Button,
  IconButton,
  PopoverAnchor
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { BiUserCircle } from 'react-icons/bi'

import { BiX } from 'react-icons/bi'

export interface User {
  name: string
  email: string
  [key: string]: any
}

export interface MemberCardProps extends StackProps {
  name?: string
  removable?: boolean
  isSelected?: boolean
  onRemove?: () => void
}

export function MemberCard({
  name,
  removable,
  onRemove,
  ...props
}: MemberCardProps) {
  return (
    <Stack
      direction="row"
      alignItems={'center'}
      shadow="xs"
      bg={
        props.isSelected
          ? useColorModeValue('green.100', 'green.800')
          : useColorModeValue('gray.100', 'gray.800')
      }
      rounded="lg"
      px={3}
      py={2}
      minW="md"
      {...props}
      cursor="pointer"
    >
      <Avatar icon={<BiUserCircle fontSize="1.8rem" />} />
      <Text fontWeight={'medium'}>{name}</Text>
      <Spacer />
      {removable && (
        <IconButton
          icon={<BiX fontSize={20} />}
          aria-label={'removed user'}
          onClick={onRemove}
        />
      )}
      {props.isSelected && (
        <Text color={'green.500'} fontWeight="medium">
          Added
        </Text>
      )}
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
  const queryInputRef = useRef<HTMLInputElement>()

  useEffect(() => {
    queryInputRef.current.addEventListener('blur', () => setIsOpen.off())
    return () => {
      queryInputRef.current.removeEventListener('blur', () => setIsOpen.off())
    }
  }, [])

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

  const handleUserRemove = (user: User) => {
    const users = selectedUsers
    const index = Array.from(users).indexOf(user)
    if (index !== -1) {
      users.splice(index, 1)
      setSelectedUsers([...users])
    }
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
                <FormLabel htmlFor="query">Search Members</FormLabel>
                <PopoverAnchor>
                  <Input
                    id="query"
                    type="text"
                    ref={queryInputRef}
                    value={values.query}
                    onChange={e => {
                      handleChange(e)
                      onInputChange(e.target.value)
                    }}
                    autoComplete={'off'}
                  />
                </PopoverAnchor>
              </Form>
            )}
          </Formik>
          <Box position="relative" mt={3}>
            <PopoverContent style={{ width: '100%' }}>
              <PopoverBody
                overflowY="auto"
                maxH="xs"
                py={3}
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
                <Stack spacing={2}>
                  {filteredUsers.length === 0 ? (
                    <Text
                      px={3}
                      py={2}
                      minW="md"
                      maxW="md"
                      textAlign="center"
                      fontWeight="medium"
                    >
                      No user matched your criteria
                    </Text>
                  ) : (
                    filteredUsers.map(user => (
                      <MemberCard
                        key={user.id}
                        name={user.name}
                        onClick={() => handleSelectedUser(user)}
                      />
                    ))
                  )}
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Box>
        </Popover>
        <Box mt={5}>
          <Heading as="h4" fontSize="md" mb="5">
            Selected Members
          </Heading>
          <Stack spacing="2">
            {selectedUsers.map(user => (
              <MemberCard
                key={user.id}
                name={user.name}
                spacing={6}
                removable
                onRemove={() => handleUserRemove(user)}
              />
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}
