import React from 'react';
import { Button, Form } from 'semantic-ui-react';


const RecipePic = props => {
    //Cloudinary widget + picture upload
    var checkUploadResult = (resultEvent) => {
        if (resultEvent.event === 'success') {
            props.setImageUrl(resultEvent.info.secure_url)
        }

        console.log("SUCCESS IMAGE", props.imageUrl)
    }
    let widget = window.cloudinary.createUploadWidget({
        cloudName: "tasty-roots",
        cropping: true,
        croppingAspectRatio: 1.0,
        maxImageWidth: 500,
        maxImageHeight: 500,
        uploadPreset: "tasty-roots",
        croppingCoordinatesMode: 'custom'
    },
        (error, result) => {
            checkUploadResult(result)
        })

    const showWidget = (widget, e) => {
        e.preventDefault()
        widget.open()
    }

    return (
        <Form.Field>
            {props.imageUrl ? <p className="url"> Added: {props.imageUrl}</p> : null}
            <Button onClick={(e) => showWidget(widget, e)} type="text">Upload</Button>
        </Form.Field>
    )
}

export default RecipePic