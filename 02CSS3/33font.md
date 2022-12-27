## CSS font 规则
`CSS` 中的 `font` 属性是一个简写属性, 可以设置字体的所有属性. 和所有简写属性一样, 如果某个对应的属性没有值, 那就会使用初始值. 可能会覆盖之前不是使用简写属性的值. 比如我们在使用 `font` 之前单独设置了 `font-weight` 为 `bolder`, 但是之后没有在 `font` 忘写了字重对应的值, 那么 `font-weight` 最终值就是 `normal`(初始值).

尽管 `font-size-adjust` 和 `font-kerning` 两个属性不是 `font` 可以简写的属性, 它们仍然会被置为初始值. 所以如果要避免误伤, 就要先写 `font` 再写 `font-size-adjust` 和 `font-kerning`.


`font` 是下面所有 `CSS` 属性的简写
- `font-family`
- `font-size`
- `font-stretch`
- `font-style`
- `font-variant`
- `font-weight`
- `line-height`

### 语法
