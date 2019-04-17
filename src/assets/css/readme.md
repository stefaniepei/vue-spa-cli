# scss
index.scss 为入口文件,引入初始化css,element-ui,公共变量,继承,混合,占坑符等

## 选择器书写规范 其它详见各自的 _xxx.scss
1. 嵌套规则
```
#root { // 嵌套规则 父容器
  a {
    &:hover { // 父选择器
      text-decoration: underline;
    }
  }
  .a, .b, .c { // 群组选择器

  }
  > section { // 子选择器
    border: 1px solid #ccc 
  }
  + p { // 相邻选择器

  }
  ~ article { // 全体组合器

  }

}

```