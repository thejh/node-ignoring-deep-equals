module.exports = ignoringDeepEquals

// Thank you for helping me with this code, kicken! my version looked so ugly...
// Check whether two objects/arrays are equal while ignoring specific parts.
// The root element must not be an ignored element.
// Ignored parts may be added, altered or removed.
// Usecase: Check whether someone only changed his "star" status of a
// package.
// ignoreKeys is an array of paths in the structure that musn't be checked.
// Example:
// var old = {name: "npm", version: "0.0.0", users: { isaacs: true, ryah: true }}
// var new = {name: "npm", version: "0.0.0", users: { isaacs: true, ryah: true, thejh: true }}
// var isAllowedChange = ignoringDeepEquals(old, new, ["users", user.name])
function ignoringDeepEquals(o1, o2, ignoreKeys, pathPrefix){
  pathPrefix = pathPrefix || []

  function fullPath(p){
    return pathPrefix.concat([p])
  }

  if (typeof o1 !== typeof o2)
    return false
  else if (!isObject(o1))
    return o1 === o2

  for (var prop in o1)
    if (o1.hasOwnProperty(prop) && !arrayInArray(fullPath(prop), ignoreKeys))
      if (!o2.hasOwnProperty(prop) || !ignoringDeepEquals(o1[prop], o2[prop], ignoreKeys, fullPath(prop)))
        return false

  for (var prop in o2)
    if (o2.hasOwnProperty(prop) && !o1.hasOwnProperty(prop) && !arrayInArray(fullPath(prop), ignoreKeys))
      return false

  return true
}

function isObject(v){
  return typeof v === 'object'
}

// Check whether `arr` contains an array that's shallowly equal to `v`.
function arrayInArray(v, arr) {
  return arr.some(function(e) {
    if (e.length !== v.length) return false
    for (var i=0; i<e.length; i++)
      if (e[i] !== v[i])
        return false
    return true
  })
}
