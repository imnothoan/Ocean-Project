import {describe,expect,it} from 'vitest';
import {controlGeometry,type ControlLayer} from '../src/features/design/controlGeometry';

describe('native controls in ungrouped Figma frames',()=>{
  const plate:ControlLayer={node:'plate',role:'shape',box:[20,80,350,46]};
  const field:ControlLayer={node:'text',role:'copy',box:[34,94,90,19]};
  it('uses the full input plate and never captures an adjacent field',()=>{
    expect(controlGeometry([plate,field],{},new Set(['text'])).inputs.text).toEqual(plate.box);
    const second:ControlLayer={...field,node:'second',box:[176,94,70,19]};
    expect(controlGeometry([plate,field,second],{},new Set(['text','second'])).inputs).toEqual({});
  });
  it('expands a single label action without swallowing two separate choices',()=>{
    const act=()=>{};
    expect(controlGeometry([plate,field],{text:act},new Set()).backgrounds[0].content.node).toBe('text');
    const link:ControlLayer={node:'link',role:'link',box:[176,94,70,19],target:'next'};
    expect(controlGeometry([plate,field,link],{text:act},new Set()).backgrounds).toEqual([]);
  });
});
