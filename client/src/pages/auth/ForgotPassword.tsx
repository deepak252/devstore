import { Link } from 'react-router-dom'
import FormInputWrapper from '@/components/FormInputWrapper'

function ForgotPassword() {
  return (
    <>
      <h4 className="text-gray-750">Forgot Password</h4>
      <FormInputWrapper title="Email">
        <input type="text" className="form-input" placeholder="Enter email" />
      </FormInputWrapper>
      <button className="btn-filled w-full mt-6 mb-5">Continue</button>
      <p className="text-sm text-center">
        Back to{' '}
        <Link to="/auth/login" className="text-primary">
          Login
        </Link>
      </p>
    </>
  )
}

export default ForgotPassword
