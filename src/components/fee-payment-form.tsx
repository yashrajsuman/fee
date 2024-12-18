"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radiogroup";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";
import { CreditCard, Smartphone, Building } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export function FeePaymentForm() {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const [timer, setTimer] = useState(30);
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();

  const [userUSN, setUserUSN] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("id");
      if (id) {
        setUserUSN(id.substring(0, 10));
        setUserEmail(id);
      }
    }
  }, []);

  useEffect(() => {
    let interval: number | undefined;
    if (showQR && timer > 0) {
      interval = window.setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      handlePaymentUpdate();
      setShowDialog(true);
    }
    return () => {
      if (interval !== undefined) clearInterval(interval);
    };
  }, [showQR, timer]);

  async function handlePaymentUpdate() {
    try {
      const response = await fetch(`${url}/api/fee/updateAmount`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usn: userUSN,
          amountPaid: amount,
          email: userEmail,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update payment");
      }

      toast.success("Payment updated successfully! Receipt sent to email.");
    } catch (error) {
      console.error("Error updating payment:", error);
      toast.error("Failed to update payment.");
    }
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }
    if (parseInt(amount) < 10000 || parseInt(amount) > 100000) {
      toast.error("Please enter an amount between ₹10,000 and ₹100,000.");
      return;
    }

    setIsLoading(true);

    const upiLink = `upi://pay?pa=7050344911@ybl&pn=Atria-Institute-Of-Technology&mc=merchant-code&tid=s-123&tr=y-123&tn=FeePayment&am=${amount}&cu=INR`;
    setQrValue(upiLink);
    setShowQR(true);
    setTimer(30);
    setIsLoading(false);
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Fee Payment</CardTitle>
        <CardDescription className="text-center">
          Complete your fee payment securely
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!showQR ? (
          <form onSubmit={onSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label htmlFor="amount" className="text-lg font-semibold">
                  Payment Amount
                </Label>
                <Input
                  id="amount"
                  placeholder="Enter amount (₹10,000 - ₹100,000)"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="10000"
                  max="100000"
                  required
                  className="text-lg p-6"
                />
              </div>
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Payment Method</Label>
                <RadioGroup
                  onValueChange={setPaymentMethod}
                  className="grid grid-cols-1 gap-4"
                  required
                >
                  <Card className="cursor-pointer transition-all hover:bg-secondary">
                    <CardContent className="flex items-center space-x-4 p-4">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex items-center space-x-2 cursor-pointer">
                        <Smartphone size={24} />
                        <span>UPI</span>
                      </Label>
                    </CardContent>
                  </Card>
                  <Card className="cursor-pointer transition-all hover:bg-secondary">
                    <CardContent className="flex items-center space-x-4 p-4">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center space-x-2 cursor-pointer">
                        <CreditCard size={24} />
                        <span>Card</span>
                      </Label>
                    </CardContent>
                  </Card>
                  <Card className="cursor-pointer transition-all hover:bg-secondary">
                    <CardContent className="flex items-center space-x-4 p-4">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <Label
                        htmlFor="netbanking"
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <Building size={24} />
                        <span>Net Banking</span>
                      </Label>
                    </CardContent>
                  </Card>
                </RadioGroup>
              </div>
            </div>
            <Button className="w-full text-lg py-6" type="submit" disabled={isLoading}>
              {isLoading ? "Processing Payment..." : "Pay Now"}
            </Button>
          </form>
        ) : (
          <div className="flex flex-col items-center space-y-6">
            <QRCodeSVG value={qrValue} size={256} />
            <p className="text-lg font-semibold">Scan the QR code to complete your payment</p>
            <p className="text-xl font-bold text-primary">Time remaining: {timer} seconds</p>
          </div>
        )}
      </CardContent>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Confirmation</DialogTitle>
            <DialogDescription>
              You will receive a confirmation email shortly. Thank you for your payment.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => router.push("/dashboard")}>Return to Dashboard</Button>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
