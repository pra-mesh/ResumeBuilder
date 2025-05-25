import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Layers, Download, Edit } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const auth = useAuth();
  const redirectTo = !auth.isAuthenticated ? "/auth/login" : "/user/resume/add";
  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Create Professional Resumes in Minutes
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Our resume builder helps you create a professional resume that
                  showcases your skills and experience. Choose from multiple
                  templates and customize to your needs.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link to={redirectTo}>Create Resume</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                alt="Resume Builder"
                className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                src="hero-section.png"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                How It Works
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Create a professional resume in three simple steps
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Edit className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">1. Fill in your details</h3>
              <p className="text-center text-muted-foreground">
                Enter your personal information, education, work experience, and
                skills.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Layers className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">2. Choose a template</h3>
              <p className="text-center text-muted-foreground">
                Select from our collection of professional resume templates.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Download className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">3. Download your resume</h3>
              <p className="text-center text-muted-foreground">
                Preview your resume and download it as a PDF file.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to create your resume?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Get started with our easy-to-use resume builder today.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link to={redirectTo}>Create Resume</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
