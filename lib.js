page = doc.currentPage()
artboard = page.currentArtboard()
canvas = artboard || page

function makeRect (parent, width, height, x, y) {
  layer = parent.addLayerOfType("rectangle")

  layer.frame().width = width
  layer.frame().height = height
  layer.frame().x = x || 0
  layer.frame().y = y || 0

  layer.style().borders().addNewStylePart()
  layer.style().border().position = 0
  layer.style().border().thickness = 1
  layer.style().border().color = [MSColor colorWithHex:"979797" alpha:1.0]

  layer.style().fills().addNewStylePart()
  layer.style().fill().color = [MSColor colorWithHex:"FFFFFF" alpha:0.0]
  return layer
}

function makePath (parent, path) {
  msPath = BCBezierPath.bezierPathWithNSBezierPath(bzPath)
  layer = MSShapeGroup.shapeWithBezierPath(msPath)
  layer.style().borders().addNewStylePart()
  layer.style().border().position = 0
  layer.style().border().thickness = 1
  layer.style().border().color = [MSColor colorWithHex:"979797" alpha:1.0]

  return parent.addLayer(layer)
}

function goldenRect (parent, width) {
  rect = makeRect(parent, width, width / 1.618)
  rect.name = "Golden Rectangle"
  return rect
}

function makeGrid (parent, width, radio) {
  w = width
  h = width / 1.618
  x = 0
  y = 0

  vSection = w * radio
  hSection = h * radio

  bzPath = NSBezierPath.new()

  bzPath.appendBezierPathWithRect(NSMakeRect(x, y, w, h))

  bzPath.moveToPoint(NSMakePoint(x + vSection, y))
  bzPath.lineToPoint(NSMakePoint(x + vSection, y + h))

  bzPath.moveToPoint(NSMakePoint(w - vSection + x, y))
  bzPath.lineToPoint(NSMakePoint(w - vSection + x, y + h))

  bzPath.moveToPoint(NSMakePoint(x, y + hSection))
  bzPath.lineToPoint(NSMakePoint(x + w, y + hSection))

  bzPath.moveToPoint(NSMakePoint(x, y + h - hSection))
  bzPath.lineToPoint(NSMakePoint(x + w, y + h - hSection))

  return makePath(group, bzPath)
}

function addGroup(name, callback) {
  group = canvas.addLayerOfType("group") 
  group.name = name
  group.ignoreNextClickThrough = true
  group.constrainProportions = true
  callback.call(this, group)
  group.resizeRoot()
  return group
}
