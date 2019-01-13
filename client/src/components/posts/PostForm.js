import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';
import { getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty'

class PostForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            errors: {}
        }
        this.props.getCurrentProfile()
    }
    componentWillReceiveProps = (newProps) => {
        if(newProps.errors) {
            this.setState({ errors: newProps.errors })
        }
    }
    onSubmit = e => {
        e.preventDefault()
        const { user } = this.props.auth
        const { profile } = this.props.profile
        const newPost = {
            text: this.state.text,
            name: !isEmpty(profile.handle) ? profile.handle : user.name,
            avatar: user.avatar
        }
        this.props.addPost(newPost)
        this.setState({ text: '', errors: {}})
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
  render() {
      const { errors } = this.state
    return (
        <div className="post-form mb-3">
            <div className="card card-info">
                <div className="card-header bg-info text-white">
                    Say Something...
                </div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <TextAreaFieldGroup 
                                placeholder="Create a post"
                                name="text"
                                value={this.state.text}
                                onChange={this.onChange}
                                error={errors.text}
                            />
                        </div>
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
  }
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    profile: state.profile
})

export default connect(mapStateToProps, { addPost, getCurrentProfile })(PostForm)