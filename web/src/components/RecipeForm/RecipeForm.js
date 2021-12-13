import {
    Form,
    FormError,
    FieldError,
    Label,
    NumberField,
    TextField,
    Submit
} from '@redwoodjs/forms';

const RecipeForm = (props) => {
    const onSubmit = (data) => {
        props.onSave(data, props?.recipe?.id);
    };

    return (
        <div className="rw-form-wrapper">
            <Form onSubmit={onSubmit} error={props.error}>
                <FormError
                    error={props.error}
                    wrapperClassName="rw-form-error-wrapper"
                    titleClassName="rw-form-error-title"
                    listClassName="rw-form-error-list"
                />

                <Label name="teamId" className="rw-label" errorClassName="rw-label rw-label-error">
                    Team id
                </Label>
                <NumberField
                    name="teamId"
                    defaultValue={props.recipe?.teamId}
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    validation={{ required: true }}
                />
                <FieldError name="teamId" className="rw-field-error" />

                <Label name="name" className="rw-label" errorClassName="rw-label rw-label-error">
                    Name
                </Label>
                <TextField
                    name="name"
                    defaultValue={props.recipe?.name}
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    validation={{ required: true }}
                />
                <FieldError name="name" className="rw-field-error" />

                <Label name="url" className="rw-label" errorClassName="rw-label rw-label-error">
                    Url
                </Label>
                <TextField
                    name="url"
                    defaultValue={props.recipe?.url}
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    validation={{ required: true }}
                />
                <FieldError name="url" className="rw-field-error" />

                <Label name="items" className="rw-label" errorClassName="rw-label rw-label-error">
                    Items
                </Label>
                <TextField
                    name="items"
                    defaultValue={props.recipe?.items}
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    validation={{ required: true }}
                />
                <FieldError name="items" className="rw-field-error" />

                <div className="rw-button-group">
                    <Submit disabled={props.loading} className="rw-button rw-button-blue">
                        Save
                    </Submit>
                </div>
            </Form>
        </div>
    );
};

export default RecipeForm;
