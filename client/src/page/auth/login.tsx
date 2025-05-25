import LoginForm from "@/components/Users/LoginForm";
import { Card, CardContent } from "@/components/ui/card";

const Login = () => {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center overflow-hidden rounded-lg bg-white shadow">
        <Card className="w-full max-w-4xl mx-auto overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Column - Branding */}
            <div className="bg-gradient-to-br from-orange-600 to-yellow-100 p-8 text-white flex flex-col justify-center items-center">
              <div className="space-y-4 text-center">
                <h1 className="text-3xl font-bold">
                  Welcome to Resume Builder
                </h1>
                <p className="text-purple-100">
                  Sign in to access your account.
                </p>
                <div className="py-8">
                  <img
                    src="/placeholder.svg?height=200&width=200"
                    alt="Login illustration"
                    className="mx-auto"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Login Form */}
            <CardContent className="p-8 flex items-center">
              <LoginForm />
            </CardContent>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Login;
