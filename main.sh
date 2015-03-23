GO2OUTPUT="$(go2node $1 $2 $3)"
GO2DISPLAY=$(echo "$GO2OUTPUT" | head -n 1)
echo $GO2DISPLAY
GO2LOCATION=$(echo "$GO2OUTPUT" | tail -n1)
if [ "$GO2LOCATION" != "./" ]
then
	cd $GO2LOCATION
	exec $SHELL
fi