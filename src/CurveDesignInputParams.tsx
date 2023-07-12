import React, { useState, useEffect } from "react";
import { InputFieldInterface, CurveParamsInterface } from "./types";
import InputParams from "./InputParams";
import { parameterDescriptions } from "./parametersDescriptions";

export default function CurveDesignInputParams({
  curveParams,
  setCurveParams
}: {
  curveParams: CurveParamsInterface;
  setCurveParams(newCurveParams: any): void;
}) {
  const [theta, setTheta] = useState(curveParams.theta); // fraction allocated to reserve (.)
  const [p0, setP0] = useState(curveParams.p0); // Hatch sale Price p0 (DAI / token)
  const [p1, setP1] = useState(curveParams.p1); // Return factor (.)
  const [wFee, setWFee] = useState(curveParams.wFee); // friction coefficient (.)
  const [vHalflife, setVHalflife] = useState(curveParams.vHalflife); // friction coefficient (.)

  useEffect(() => {
    setTheta(curveParams.theta);
    setP0(curveParams.p0);
    setP1(curveParams.p1);
    setWFee(curveParams.wFee);
    setVHalflife(curveParams.vHalflife);
  }, [curveParams]);

  const maxReturnRate = 10;
  const minP1P0Rate = 1.5;

  function _setP0(newP0: number) {
    setP0(newP0);
    if (p1 < newP0 * minP1P0Rate) setP1(newP0 * minP1P0Rate);
    else if (p1 > newP0 * maxReturnRate) setP1(newP0 * maxReturnRate);
  }

  function setParentCurveParams() {
    setCurveParams((params: CurveParamsInterface) => ({
      ...params,
      theta,
      p0,
      p1,
      wFee,
      vHalflife
    }));
  }

  const inputFields: InputFieldInterface[] = [
    {
      label: parameterDescriptions.theta.name,
      description: parameterDescriptions.theta.text,
      value: theta,
      setter: setTheta,
      min: 0,
      max: 0.9,
      step: 0.01,
      suffix: "%",
      format: (n: number) => `${Math.round(100 * n)}%`,
      toText: (n: number) => String(+(n * 1e2).toFixed(0)),
      toNum: (n: string) => parseFloat(n) * 1e-2
    },
    {
      label: `${parameterDescriptions.p0.name} (DAI/token)`,
      description: parameterDescriptions.p0.text,
      value: p0,
      setter: _setP0,
      min: 0.01,
      max: 1,
      step: 0.01,
      toText: (n: number) => String(+n.toFixed(2)),
      toNum: (n: string) => parseFloat(n),
      format: (n: number) => `$${n}`
    },
    {
      label: `${parameterDescriptions.p1.name} (DAI/token)`,
      description: parameterDescriptions.p1.text,
      value: p1,
      setter: setP1,
      min: Number((minP1P0Rate * (p0 || 0.1)).toFixed(2)),
      max: Number((maxReturnRate * p0).toFixed(2)),
      step: 0.01,
      toText: (n: number) => String(+n.toFixed(2)),
      toNum: (n: string) => parseFloat(n),
      format: (n: number) => `$${n}`
    },
    {
      label: parameterDescriptions.wFee.name,
      description: parameterDescriptions.wFee.text,
      value: wFee,
      setter: setWFee,
      min: 0,
      max: 0.1,
      step: 0.001,
      suffix: "%",
      format: (n: number) => `${+(100 * n).toFixed(1)}%`,
      toText: (n: number) => String(+(n * 1e2).toFixed(1)),
      toNum: (n: string) => parseFloat(n) * 1e-2
    },
    {
      label: `${parameterDescriptions.vHalflife.name} (weeks)`,
      description: parameterDescriptions.vHalflife.text,
      value: vHalflife,
      setter: setVHalflife,
      min: 1,
      max: 52 * 2,
      step: 1,
      suffix: "",
      format: (n: number) => String(Math.round(n)),
      toText: (n: number) => String(Math.round(n)),
      toNum: (n: string) => Math.round(parseInt(n))
    }
  ];

  return (
    <InputParams
      inputFields={inputFields}
      onChangeCommited={setParentCurveParams}
    />
  );
}
