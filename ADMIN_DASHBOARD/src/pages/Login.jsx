import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { clearAllUserErrors, login } from "../store/slices/userSlice"
import { toast } from "react-toastify"
import Loadingbutton from "./loadingbutton/Loadingbutton"

const Login = ({
  className,
  ...props
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { loading, isAuthenticated, error, message } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllUserErrors())
    }
    if (isAuthenticated) {
      navigate('/')
    }
    if (message) {
      dispatch(clearAllUserErrors())
      toast.success(message)
    }
  }, [dispatch, isAuthenticated, loading, error, message, navigate])
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
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to='/password/forgot'
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input value={password}
                  onChange={(e) => setPassword(e.target.value)} id="password" type="password" required />
              </div>
              {
                loading ? (<Loadingbutton content={'logging In'} />) : (<Button onClick={handleLogin} className="w-full">
                  Login
                </Button>)
              }
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}

export default Login