import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import Loadingbutton from "./loadingbutton/Loadingbutton"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { forgotPassword } from "@/store/slices/forgotResetPasswordSlice";
import { clearAllForgotPasswordErrors } from "../store/slices/forgotresetPasswordSlice";

const ForgotPassword = ({
  className,
  ...props
}) => {
  const { loading, error, message } = useSelector((state) => state.forgotpassword)
  const { isAuthenticated } = useSelector((state) => state.user)
  const [email, setEmail] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleForgotPassword = (event) => {
    event.preventDefault()
    dispatch(forgotPassword(email))
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
                  Login to your Acme Inc account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                  autoComplete='current-password'
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Link
                    to='/login'
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Remember your password?
                  </Link>
                </div>
              </div>
              {
                loading ? (<Loadingbutton content={'logging In'} />) : (<Button onClick={handleForgotPassword} className="w-full">
                  Forgot Password
                </Button>)
              }
            </div>
          </form>

        </CardContent>
      </Card>
    </div>
  )
}

export default ForgotPassword