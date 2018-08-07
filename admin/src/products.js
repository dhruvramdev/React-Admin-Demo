// in books.js
import React from 'react';
import {
    List,
    Datagrid,
    Edit,
    Create,
    SimpleForm,
    DateField,
    TextField,
    EditButton,
    DisabledInput,
    TextInput,
    LongTextInput,
    DateInput
} from 'react-admin';
// import PostI from '@material-ui/icons/Post';
// export const ProductIcon = ProductIcon;

export const ProductList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="_id"/>
            <TextField source="name"/>
            <TextField source="image"/>
            <TextField source="about"/>
            <EditButton/>
        </Datagrid>
    </List>
);

const ProductTitle = ({record}) => {
    return <span>Product {record ? `"${record.title}"` : ''}</span>;
};

export const ProductEdit = (props) => (
    <Edit title={<ProductTitle/>} {...props}>
        <SimpleForm>
            <DisabledInput source="id"/>
            <TextField source="name"/>
            <TextField source="image"/>
            <TextField source="about"/>
        </SimpleForm>
    </Edit>
);

export const ProductCreate = (props) => (
    <Create title="Create a Product" {...props}>
        <SimpleForm>
        <TextField source="name"/>
            <TextField source="image"/>
            <TextField source="about"/>
        </SimpleForm>
    </Create>
);