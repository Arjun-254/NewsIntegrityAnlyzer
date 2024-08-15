true_true_count=$(grep 'True|True' Pipeline_Article.csv | wc -l)
false_false_count=$(grep 'False|False' Pipeline_Article.csv | wc -l)
total_lines=$(wc -l < Pipeline_Article.csv)

accuracy=$(echo "scale=4; (($true_true_count + $false_false_count) / ($total_lines-1) )*100" | bc)
echo "Accuracy: $accuracy"