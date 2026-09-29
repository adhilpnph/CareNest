"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { login } from "../../store/authSlice";
import { useLoginMutation } from "../../store/careNestApi";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Icon } from "../ui/IconGlyph";

type AdminLoginProps = {
  onClose: () => void;
};

export function AdminLogin({ onClose }: AdminLoginProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginRequest, loginResult] = useLoginMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    try {
      const session = await loginRequest({ username, password }).unwrap();
      if (session.role !== "ADMIN" || !session.is_authenticated || !session.access_token) {
        setError("This account does not have administrator access.");
        return;
      }
      dispatch(login(session.access_token));
      onClose();
    } catch {
      setError("Unable to sign in. Check your details and try again.");
    }
  };

  return (
    <Card className="animate-rise mb-6 overflow-hidden border-[#e4e1eb] shadow-[0_18px_55px_rgba(38,34,60,0.08)]">
      <div className="flex items-start justify-between gap-4 border-b border-[#efedf2] bg-gradient-to-r from-[#faf9fd] to-white px-5 py-5 sm:px-6">
        <div>
          <Badge variant="accent" className="uppercase tracking-[0.12em]">Admin access</Badge>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[#292830]">Sign in to CareNest</h2>
          <p className="mt-1 text-sm text-[#85828d]">Use your administrator account to continue.</p>
        </div>
        <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close admin sign-in">
          <Icon name="close" className="size-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
        <label className="grid gap-1.5 text-[11px] font-medium text-[#67656f]">
          Email
          <Input type="email" value={username} onChange={(event) => setUsername(event.target.value)} required />
        </label>
        <label className="grid gap-1.5 text-[11px] font-medium text-[#67656f]">
          Password
          <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>
        <div className="sm:col-span-2">
          {error && <p role="alert" className="mb-3 text-sm text-[#b74b4b]">{error}</p>}
          <Button type="submit" disabled={loginResult.isLoading}>
            {loginResult.isLoading ? "Signing in..." : "Sign in"}
            {!loginResult.isLoading && <Icon name="arrow-right" className="size-4" />}
          </Button>
        </div>
      </form>
    </Card>
  );
}
