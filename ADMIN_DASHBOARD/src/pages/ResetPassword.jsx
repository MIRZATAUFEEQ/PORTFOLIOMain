import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { useNavigate, Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import Loadingbutton from "./loadingbutton/Loadingbutton"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearAllForgotPasswordErrors, resetPassword } from "../store/slices/forgotresetPasswordSlice";

const ResetPassword = ({
  className,
  ...props
}) => {
  const { token } = useParams()
  const { loading, error, message } = useSelector((state) => state.forgotpassword)
  const { isAuthenticated } = useSelector((state) => state.user)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleResetPassword = (e) => {
    e.preventDefault()
    dispatch(resetPassword(token, password, confirmPassword))
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllForgotPasswordErrors())
    }
    if (isAuthenticated) {
      navigate('/')
    }
    if (message) {
      toast.success(message)
    }
  }, [dispatch, isAuthenticated, error, message])
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Set a new password
                </p>
              </div>
              <div className="grid gap-2">
                <Label>Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete='current-password'
                />
              </div>
              <div className="grid gap-2">
                <Label>Confirm Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete='current-password'
                />
              </div>

              {
                loading ? (<Loadingbutton content={'logging In'} />) : (<Button onClick={handleResetPassword} className="w-full">
                  Reset Password
                </Button>)
              }
            </div>
          </form>

        </CardContent>
      </Card>
    </div>
  )
}

export default ResetPassword