import './App.css'

// Singular vs Plural i.e. "...contact" "...contacts"
import {
  useAddContactMutation,
  useContactQuery,
  useContactsQuery,
  useDeleteContactMutation,
  useUpdateContactMutation,
} from './services/contactsApi'

function App() {
  const { data, error, isLoading, isFetching, isSuccess } = useContactsQuery()
  console.log(data)

  return (
    <div className="App">
      <h1>React Redux Toolkit RTK Query Tutorial</h1>

      {isLoading && <h2>...Loading</h2>}
      {isFetching && <h2>...isFetching</h2>}
      {error && <h2>Something went wrong</h2>}

      {isSuccess && (
        <section>
          {data?.map((contact) => {
            return (
              <div className="data" key={contact.id}>
                <span>{contact.name}</span>
                <span>
                  <ContactDetail id={contact.id} />
                </span>
              </div>
            )
          })}
        </section>
      )}
      <section>
        <AddContact />
      </section>
    </div>
  )
}

// These are child components to be used inside of App parent component
export const ContactDetail = ({ id }: { id: string }) => {
  const { data } = useContactQuery(id)

  return <pre>{JSON.stringify(data, undefined, 2)}</pre>
}

export const AddContact = () => {
  const [addContact] = useAddContactMutation()
  const [updateContact] = useUpdateContactMutation()
  const [deleteContact] = useDeleteContactMutation()

  const contact = {
    'id': '2',
    'name': 'Huy Nguyen 2',
    'email': 'huy2@huy.org',
  }

  const contactUpdate = {
    'id': '1',
    'name': 'Huy Nguyen UPDATED',
    'email': 'huy_UPDATED@huy.org',
  }

  const addHandler = async () => {
    await addContact(contact)
  }

  const updateHandler = async () => {
    await updateContact(contactUpdate)
  }

  const deleteHandler = async () => {
    await deleteContact(contact.id)
  }

  return (
    <>
      <button onClick={addHandler}>Add Contact</button>
      <button onClick={updateHandler}>Update Contact</button>
      <button onClick={deleteHandler}>Delete Contact</button>
    </>
  )
}
// End of child components

export default App
