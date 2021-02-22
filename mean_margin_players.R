data <- read.csv("C:/Users/Liberta/Desktop/FIT5147/final/AFL/stats.csv")
Means <- aggregate(data[,11], by =list(data[,2], data[,4]), FUN = mean, na.rm = TRUE)

write.csv(Means,"C:/Users/Liberta/Desktop/FIT5147/final/AFL/heightmean.csv", row.names = FALSE) 