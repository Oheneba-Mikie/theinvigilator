import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  AlertTriangle,
  CheckCircle,
  X,
  Eye,
  Camera,
  Mic,
  Monitor,
} from "lucide-react";

interface ExamRulesDialogProps {
  open: boolean;
  onClose: () => void;
}

const ExamRulesDialog = ({ open, onClose }: ExamRulesDialogProps) => {
  const [agreedToRules, setAgreedToRules] = React.useState(false);

  const handleClose = () => {
    setAgreedToRules(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Exam Rules & Guidelines</DialogTitle>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto pr-2">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <Camera className="h-5 w-5 mr-2 text-blue-600" />
                Camera & Video Monitoring
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                  <span>
                    Your webcam must remain on and unobstructed throughout the
                    entire exam.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                  <span>
                    Your face must be clearly visible and well-lit at all times.
                  </span>
                </li>
                <li className="flex items-start">
                  <X className="h-4 w-4 mr-2 text-red-600 mt-0.5" />
                  <span>
                    Do not wear hats, sunglasses, or other items that obscure
                    your face.
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <Mic className="h-5 w-5 mr-2 text-blue-600" />
                Audio Monitoring
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                  <span>
                    Your microphone will be active during the exam to detect
                    background noise.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                  <span>
                    Take the exam in a quiet environment with minimal
                    distractions.
                  </span>
                </li>
                <li className="flex items-start">
                  <X className="h-4 w-4 mr-2 text-red-600 mt-0.5" />
                  <span>
                    Speaking to others or reading questions aloud is not
                    permitted.
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <Monitor className="h-5 w-5 mr-2 text-blue-600" />
                Screen Monitoring
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                  <span>
                    Your screen activity will be recorded during the exam.
                  </span>
                </li>
                <li className="flex items-start">
                  <X className="h-4 w-4 mr-2 text-red-600 mt-0.5" />
                  <span>
                    Do not navigate away from the exam window or open other
                    applications.
                  </span>
                </li>
                <li className="flex items-start">
                  <X className="h-4 w-4 mr-2 text-red-600 mt-0.5" />
                  <span>
                    Using search engines or accessing unauthorized resources is
                    prohibited.
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <Eye className="h-5 w-5 mr-2 text-blue-600" />
                The Invigilator Monitoring
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                  <span>
                    A human invigilator will be monitoring your exam session.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                  <span>
                    The invigilator may contact you via chat if they notice any
                    suspicious activity.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                  <span>
                    You can request assistance from the invigilator using the
                    help button.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 mr-2 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800 mb-1">
                    Important Notice
                  </h4>
                  <p className="text-sm text-amber-700">
                    Violations of these rules may result in your exam being
                    terminated, and your results may be invalidated. Multiple
                    violations may lead to disciplinary action according to your
                    institution's academic integrity policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex items-center space-x-2 mb-4">
          <Checkbox
            id="agree-rules"
            checked={agreedToRules}
            onCheckedChange={(checked) => setAgreedToRules(!!checked)}
          />
          <Label
            htmlFor="agree-rules"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I have read and agree to follow all exam rules and guidelines
          </Label>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button disabled={!agreedToRules} onClick={handleClose}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExamRulesDialog;
