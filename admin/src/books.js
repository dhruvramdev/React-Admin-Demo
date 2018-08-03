// in books.js
import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput } from 'react-admin';
// import PostI from '@material-ui/icons/Post';
// export const BookIcon = BookIcon;

export const BookList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="author" />
            <TextField source="isbn" />
            <EditButton />
        </Datagrid>
    </List>
);

const BookTitle = ({ record }) => {
    return <span>Book {record ? `"${record.title}"` : ''}</span>;
};

export const BookEdit = (props) => (
    <Edit title={<BookTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="title" />
            <TextInput source="author"/>
            <TextInput source="isbn"/>
        </SimpleForm>
    </Edit>
);

export const BookCreate = (props) => (
    <Create title="Create a Book" {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="author"/>
            <TextInput source="isbn"/>
        </SimpleForm>
    </Create>
);