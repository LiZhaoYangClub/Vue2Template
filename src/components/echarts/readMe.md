## 动态监视option 变化会重新绘制

```html
  <ak-echarts :option="option" :repaint="false"/>
```
+ (repaint 布尔值 重绘方式，默认值为true可不传)
+ (true => 动态重绘)
+ (false => 静态重绘)
