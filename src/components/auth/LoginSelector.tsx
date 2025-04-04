import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UserCog,
  Users,
  GraduationCap,
  AlertCircle,
  Eye,
  EyeOff,
  Camera,
  Check,
  Info,
  ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type UserRole = "admin" | "proctor" | "student";

interface LoginSelectorProps {
  onSelectRole?: (role: UserRole) => void;
  onLogin?: (credentials: any) => void;
}

const LoginSelector = ({
  onSelectRole = () => {},
  onLogin = () => {},
}: LoginSelectorProps) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showLoginForm, setShowLoginForm] = useState(false);

  // Common form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Student-specific states
  const [studentId, setStudentId] = useState("");
  const [examCode, setExamCode] = useState("");
  const [activeTab, setActiveTab] = useState("login");
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Animation variants for form transitions
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  // Animation variants for role cards
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
      transition: { duration: 0.2 },
    },
  };

  const handleRoleSelect = (role: UserRole) => {
    // Add a slight delay when changing roles to allow exit animation to complete
    if (selectedRole !== role) {
      // First reset the form state
      setEmail("");
      setPassword("");
      setStudentId("");
      setExamCode("");
      setError("");
      setIsVerified(false);

      // Then update the role
      setSelectedRole(role);
      setShowLoginForm(true);
      onSelectRole(role);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (selectedRole === "admin" || selectedRole === "proctor") {
      if (!email || !password) {
        setError("Please enter both email and password");
        return;
      }
    } else if (selectedRole === "student") {
      if (!studentId || !examCode) {
        setError("Please enter both student ID and exam code");
        return;
      }
    }

    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Handle login based on role
      if (selectedRole === "admin" || selectedRole === "proctor") {
        onLogin({ email, password, role: selectedRole });
      } else if (selectedRole === "student") {
        onLogin({ studentId, examCode, role: selectedRole });
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Could not access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const verifyIdentity = () => {
    // Simulate verification
    setIsLoading(true);
    setTimeout(() => {
      setIsVerified(true);
      setIsLoading(false);
      stopCamera();
      setActiveTab("login");
    }, 2000);
  };

  const renderLoginForm = () => {
    if (!selectedRole) return null;

    // We'll wrap each form in a motion.div in the parent component

    if (selectedRole === "admin" || selectedRole === "proctor") {
      return (
        <form onSubmit={handleSubmit}>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder={
                  selectedRole === "admin"
                    ? "admin@example.com"
                    : "invigilator@example.com"
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(!!checked)}
              />
              <Label
                htmlFor="remember"
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </Label>
            </div>
          </div>
          <Button
            type="submit"
            className={`mt-6 w-full ${selectedRole === "admin" ? "bg-blue-600 hover:bg-blue-700" : "bg-indigo-600 hover:bg-indigo-700"}`}
            disabled={isLoading}
          >
            {isLoading
              ? "Logging in..."
              : `${selectedRole === "admin" ? "Admin" : "The Invigilator"} Login`}
          </Button>
        </form>
      );
    } else if (selectedRole === "student") {
      return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login Details</TabsTrigger>
            <TabsTrigger value="verify">Identity Verification</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleSubmit}>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    placeholder="Enter your student ID"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="examCode">Exam Code</Label>
                  <Input
                    id="examCode"
                    placeholder="Enter the exam code"
                    value={examCode}
                    onChange={(e) => setExamCode(e.target.value)}
                    required
                  />
                </div>

                {isVerified ? (
                  <Alert className="bg-green-50 border-green-200">
                    <Check className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-600">
                      Identity verified successfully
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert className="bg-blue-50 border-blue-200">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-600">
                      Identity verification required before starting the exam
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="mt-6 flex gap-2">
                {!isVerified && (
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setActiveTab("verify")}
                  >
                    Verify Identity
                  </Button>
                )}
                <Button
                  type="submit"
                  className={`${isVerified ? "w-full" : "flex-1"} bg-purple-600 hover:bg-purple-700`}
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Start Exam"}
                </Button>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="verify">
            <div className="space-y-4">
              <div className="rounded-md border bg-slate-50 p-2">
                <div className="aspect-video relative overflow-hidden rounded-md bg-black">
                  {!isCameraActive ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <Camera className="mb-2 h-12 w-12 opacity-50" />
                      <p className="text-center text-sm opacity-70">
                        Camera access required for identity verification
                      </p>
                    </div>
                  ) : null}
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`h-full w-full object-cover ${!isCameraActive ? "hidden" : ""}`}
                  />
                </div>
              </div>

              <Alert className="bg-blue-50 border-blue-200">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-600">
                  Please ensure your face is clearly visible and well-lit
                </AlertDescription>
              </Alert>

              <div className="flex gap-2">
                {!isCameraActive ? (
                  <Button
                    type="button"
                    onClick={startCamera}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Camera className="mr-2 h-4 w-4" /> Enable Camera
                  </Button>
                ) : (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={stopCamera}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      onClick={verifyIdentity}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Verifying..." : "Verify Identity"}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      );
    }

    return null;
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/Login Pages.jpg')" }}
    >
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Platform Information */}
        <div className="space-y-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600">
              <span className="text-3xl font-bold text-white">THE</span>
            </div>
            <h1 className="text-4xl font-bold text-white">
              The Invigilator Platform
            </h1>
            <p className="mt-3 text-xl text-white">
              Secure, professional exam monitoring for educational institutions
            </p>
          </div>
          {/* Role Selection Dropdown */}
          <div className="mb-8">
            <Select
              value={selectedRole || ""}
              onValueChange={(value) => handleRoleSelect(value as UserRole)}
            >
              <SelectTrigger className="w-full bg-white/90 border-0 shadow-lg h-14">
                <SelectValue placeholder="Select your role" />
                <ChevronDown className="h-5 w-5 opacity-70" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 border-0 shadow-xl">
                <SelectItem value="admin" className="py-3 flex items-center">
                  <div className="flex items-center">
                    <div className="mr-3 p-2 rounded-full bg-blue-100">
                      <UserCog className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">Administrator</div>
                      <div className="text-xs text-gray-500">
                        Manage exams and system settings
                      </div>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="proctor" className="py-3">
                  <div className="flex items-center">
                    <div className="mr-3 p-2 rounded-full bg-indigo-100">
                      <Users className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-medium">The Invigilator</div>
                      <div className="text-xs text-gray-500">
                        Monitor exams and respond to alerts
                      </div>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="student" className="py-3">
                  <div className="flex items-center">
                    <div className="mr-3 p-2 rounded-full bg-purple-100">
                      <GraduationCap className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium">Student</div>
                      <div className="text-xs text-gray-500">
                        Take exams with secure verification
                      </div>
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Role Cards */}
        </div>

        {/* Right Column - Login Form */}
        <div className="flex items-center justify-center">
          <AnimatePresence mode="wait">
            {selectedRole ? (
              <motion.div
                key="login-form"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={formVariants}
                className="w-full"
              >
                <Card className="w-full border-0 shadow-xl bg-white/95">
                  <CardHeader>
                    <CardTitle>
                      {selectedRole === "admin"
                        ? "Administrator Login"
                        : selectedRole === "proctor"
                          ? "The Invigilator Login"
                          : "Student Login"}
                    </CardTitle>
                    <CardDescription>
                      {selectedRole === "admin"
                        ? "Enter your credentials to access the admin dashboard"
                        : selectedRole === "proctor"
                          ? "Enter your credentials to monitor exams"
                          : "Enter your details to access your exam"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedRole}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={formVariants}
                      >
                        {renderLoginForm()}
                      </motion.div>
                    </AnimatePresence>
                  </CardContent>
                  <CardFooter className="flex justify-center border-t p-4">
                    <p className="text-center text-sm text-muted-foreground">
                      {selectedRole === "admin"
                        ? "Need help? "
                        : selectedRole === "proctor"
                          ? "First time here? "
                          : "Having trouble? "}
                      <a
                        href="#"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {selectedRole === "admin"
                          ? "Contact support"
                          : selectedRole === "proctor"
                            ? "View training materials"
                            : "Contact your instructor"}
                      </a>
                    </p>
                  </CardFooter>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="welcome-prompt"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={formVariants}
                className="w-full"
              >
                <div className="flex flex-col items-center justify-center p-8 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 text-white">
                  <GraduationCap className="h-16 w-16 mb-4 opacity-80" />
                  <h2 className="text-2xl font-bold mb-2">
                    Ready to get started?
                  </h2>
                  <p className="text-center mb-6">
                    Select your role from the options on the left to continue
                  </p>
                  <div className="flex gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        className="border-white text-white hover:bg-white/20"
                        onClick={() => handleRoleSelect("admin")}
                      >
                        Admin
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        className="border-white text-white hover:bg-white/20"
                        onClick={() => handleRoleSelect("proctor")}
                      >
                        Invigilator
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        className="border-white text-white hover:bg-white/20"
                        onClick={() => handleRoleSelect("student")}
                      >
                        Student
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="fixed bottom-4 text-center text-sm text-white">
        © 2023 The Invigilator Platform. All rights reserved.
      </div>
    </div>
  );
};

export default LoginSelector;
